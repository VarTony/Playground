
//Demo version of cosine;

const pi = 3.14;

const cos = (a, b = 90 - a, part = 180 / b ) => {

	if(a > 90 || a < 0) return 'Аргумент должен быть в диапозоне от 0 до 90 градусов';
	return a === 90 ? 0 : pi / part; 

}


// public class Cordic {
 
//     private double[] lookup;
//     private final int iterations = 32;
//     private final double K = 0.60725293510314;
//     private final double halfPi = 1.57079632679;
 
//     Cordic() {
//         createLookupTable();
//     }
 
//     public double sin(double theta) {
//         return sinCos(theta)[1];
//     }
 
//     public double cos(double theta) {
//         return sinCos(theta)[0];
//     }
 
//     public double[] sinCos(double theta) {
//         if (theta < 0 || theta > halfPi) {
//             throw new IllegalArgumentException("Required value 0 < x < Pi/2");
//         }
//         double x = K;
//         double y = 0;
//         double z = theta;
//         double v = 1.0;
//         for (int i=0; i<iterations; i++) {
//             double d = (z >= 0)? +1 : -1;
//             double tx = x - d * y * v;
//             double ty = y + d * x * v;
//             double tz = z - d * lookup[i];
//             x = tx; y= ty; z = tz;
//             v *= 0.5;
//         }
//         double[] result = {x,y};
//         return result;
//     }
 
//     private void createLookupTable() {
//         lookup = new double[iterations];
//         for (int i=0; i<iterations; i++) {
//             lookup[i] = Math.atan(1 / Math.pow(2,i));
//             System.out.format("Tan (%02d): %.14f / %018.3f %n", i,  lookup[i], Math.pow(2,i));
//         }
//     }
 
//     public static void main(String[] args) {
//         Cordic c = new Cordic();
//         for (double i=0; i<90; i++) {
//             double rad = i * (Math.PI / 180);
//             System.out.format(
//             "Sin: %04.1f (rad: %.14f) CORDIC: %.14f / java: %.14f %n", i, rad, c.sin(rad), Math.sin(rad) );
//         }
//     }
 
// }