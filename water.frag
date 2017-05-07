#ifdef GL_ES
precision lowp float;
#endif

uniform float time;

varying vec4 v_color;
varying vec2 v_texCoords;
uniform sampler2D u_texture;
uniform mat4 u_projTrans;

#define MAX_ITER 11

void main( void )
{
	vec2 resolution = vec2(800,600);
	vec2 p=gl_FragCoord.xy/resolution*10.0-vec2(19.0);
	vec2 i = p;
	float c = 0.5;
	float inten = .07;

	for (int n = 0; n < MAX_ITER; n++) 
	{
		float t = time * (1.0 - (3.0 / float(n+1)));
		i = p + vec2(cos(t - i.x) + sin(t + i.y), sin(t - i.y) + cos(t + i.x));
		c += 1.0/length(vec2(p.x / (2.*sin(i.x+t)/inten),p.y / (cos(i.y+t)/inten)));
	}
	
	c /= float(MAX_ITER);
	c = 1.5-sqrt(pow(c,3.+0.5));
	
	vec3 color = texture2D(u_texture, v_texCoords).rgb;
	gl_FragColor = vec4(color*c*c*c*(c/2.0), 1.0);
	//gl_FragColor = vec4(color, 1.0);
	//gl_FragColor = vec4(0.0,0.5,0.0,1.0);
}