// Sand and footprints share a height field, so the impressions catch the same light.
const VERTEX = `
  attribute vec2 a_position;
  varying vec2 v_uv;
  void main() {
    v_uv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const FRAGMENT = `
  precision highp float;
  varying vec2 v_uv;
  uniform vec2 u_resolution;
  uniform float u_time;
  uniform vec4 u_steps[10];

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), f.x),
      mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0)), f.x), f.y);
  }

  float ellipse(vec2 p, vec2 radius) {
    return (length(p / radius) - 1.0) * min(radius.x, radius.y);
  }

  float softMin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / k, 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
  }

  float foot(vec2 p) {
    float heel = ellipse(p - vec2(-0.025, -0.31), vec2(0.115, 0.16));
    float arch = ellipse(p - vec2(-0.06, -0.055), vec2(0.085, 0.22));
    float ball = ellipse(p - vec2(0.0, 0.18), vec2(0.165, 0.19));
    float sole = softMin(softMin(heel, arch, 0.055), ball, 0.065);
    // The separated toes are part of the depression, rather than a printed icon.
    float toes = ellipse(p - vec2(0.125, 0.445), vec2(0.065, 0.08));
    toes = min(toes, ellipse(p - vec2(0.005, 0.47), vec2(0.046, 0.064)));
    toes = min(toes, ellipse(p - vec2(-0.085, 0.44), vec2(0.039, 0.055)));
    toes = min(toes, ellipse(p - vec2(-0.157, 0.39), vec2(0.033, 0.047)));
    toes = min(toes, ellipse(p - vec2(-0.207, 0.325), vec2(0.026, 0.038)));
    return min(sole, toes);
  }

  float impression(vec2 p) {
    float height = 0.0;
    for (int i = 0; i < 10; i++) {
      vec4 step = u_steps[i];
      vec2 q = (p - step.xy) / step.w;
      // Most pixels are sand; avoid evaluating every toe for those pixels.
      if (abs(q.x) > 0.75 || abs(q.y) > 0.8) continue;
      float c = cos(step.z), s = sin(step.z);
      q = mat2(c, -s, s, c) * q;
      q.x *= mod(float(i), 2.0) < 0.5 ? 1.0 : -1.0;
      float age = mod(u_time - float(i) * 0.94 + 18.0, 18.0);
      float pressure = smoothstep(0.0, 0.36, age - (q.y + 0.5) * 0.22);
      float erosion = smoothstep(5.5, 12.5, age);
      float strength = pressure * (1.0 - erosion);
      float d = foot(q);
      // An irregular edge, a shallow cavity, and the little ridge of displaced sand.
      d += (noise(q * 65.0 + float(i)) - 0.5) * 0.012;
      float softness = mix(0.016, 0.07, erosion);
      float cavity = 1.0 - smoothstep(-0.05 - softness, softness, d);
      float rim = exp(-pow((d - 0.02) / (0.018 + erosion * 0.045), 2.0));
      height += (-0.0075 * cavity + 0.0016 * rim) * strength;
    }
    return height;
  }

  float sand(vec2 p) {
    vec2 drift = vec2(u_time * 0.0015, u_time * 0.0005);
    float broad = noise(p * 1.55 + drift);
    float warp = noise(p * 3.2 + vec2(12.4, 4.2));
    float wave = p.x * 38.0 + p.y * 57.0 + warp * 7.5 + broad * 3.0;
    float ripples = sin(wave) + 0.24 * sin(wave * 2.0 + 0.6);
    float rippleStrength = smoothstep(0.18, 0.85, noise(p * 1.6 + 7.0));
    return broad * 0.10 + noise(p * 4.0 + drift) * 0.014
      + ripples * 0.007 * rippleStrength;
  }

  float surface(vec2 p) { return sand(p) + impression(p); }

  void main() {
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = vec2(v_uv.x * aspect, v_uv.y);
    float e = 1.2 / u_resolution.y;
    float h = surface(p);
    vec3 normal = normalize(vec3(
      (h - surface(p + vec2(e, 0.0))) / e,
      (h - surface(p + vec2(0.0, e))) / e, 1.0));
    vec3 light = normalize(vec3(-0.65, 0.8, 1.35));
    float diffuse = dot(normal, light);
    float depth = impression(p);
    float grain = hash(gl_FragCoord.xy) - 0.5;
    float fineGrain = noise(p * 420.0) - 0.5;
    float duneTone = noise(p * 2.0 + 5.0);
    vec3 sandColor = mix(vec3(0.78, 0.73, 0.64), vec3(0.93, 0.89, 0.81), duneTone);
    vec3 color = sandColor * (0.78 + diffuse * 0.28);
    color += grain * 0.043 + fineGrain * 0.018;
    color *= 1.0 + min(depth, 0.0) * 6.5;
    // A little reflected sky light keeps the sand close to the NES paper palette.
    color = mix(color, vec3(0.955, 0.947, 0.923), 0.22);
    gl_FragColor = vec4(color, 1.0);
  }
`;

export function createSandRenderer(canvas) {
  const gl = canvas.getContext("webgl", { alpha: false, antialias: false, depth: false, powerPreference: "low-power" });
  if (!gl) return null;
  const shaders = [];
  const program = gl.createProgram();
  let buffer;
  const dispose = () => {
    if (buffer) gl.deleteBuffer(buffer);
    shaders.forEach(shader => gl.deleteShader(shader));
    gl.deleteProgram(program);
  };
  for (const [type, source] of [[gl.VERTEX_SHADER, VERTEX], [gl.FRAGMENT_SHADER, FRAGMENT]]) {
    const shader = gl.createShader(type);
    shaders.push(shader);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { dispose(); return null; }
    gl.attachShader(program, shader);
  }
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { dispose(); return null; }
  gl.useProgram(program);
  buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, "a_position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const resolution = gl.getUniformLocation(program, "u_resolution");
  const time = gl.getUniformLocation(program, "u_time");
  const steps = gl.getUniformLocation(program, "u_steps[0]");

  return {
    resize(width, height) {
      // Bound the GPU workload independently of the screen's device pixel ratio.
      const ratio = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(850000 / (width * height)));
      canvas.width = Math.max(1, Math.round(width * ratio));
      canvas.height = Math.max(1, Math.round(height * ratio));
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(resolution, canvas.width, canvas.height);
      const aspect = canvas.width / canvas.height;
      const trail = [];
      for (let index = 0; index < 10; index++) {
        const t = index / 9;
        const side = index % 2 ? 1 : -1;
        const center = width <= 760 ? 0.76 - t * 0.44 : 0.84 - t * 0.19;
        const x = center * aspect + side * 0.033;
        const y = width <= 760 ? 0.48 + t * 0.75 : 0.04 + t * 0.89;
        const angle = (0.22 + Math.sin(t * 4) * 0.12 + side * 0.10);
        const size = (width <= 760 ? 0.10 : 0.155) * (1 - t * 0.3);
        trail.push(x, y, angle, size);
      }
      gl.uniform4fv(steps, new Float32Array(trail));
    },
    render(seconds) {
      gl.uniform1f(time, seconds);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    },
    dispose,
  };
}
