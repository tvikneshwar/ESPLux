$fn = 30;
// 5.02 wide
module standoff()
{
//hexagon(5.02/2);
circle(3.2/2, $fn = 30);
}
module hexagon(length) { width = 2 * length * tan(30); union() { square(size = [ length * 2, width ], center = true); rotate(a = [ 0, 0, 60 ]) { square(size = [ length * 2, width ], center = true); } rotate(a = [ 0, 0, -60 ]) { square(size = [ length * 2, width ], center = true); } } }

module screwTerminalLid()
{
difference()
{
	hull()
	{
		translate([-35+4,-43/2+4]) circle(4);
		translate([35-4,-43/2+4]) circle(4);
		translate([-35+4,43/2-4]) circle(4);
		translate([35-4,43/2-4]) circle(4);
	}
	translate([31, 43/2-4]) rotate([0,0,-15]) standoff();
	translate([31, -43/2+4]) rotate([0,0,15]) standoff();
	translate([-31, 43/2-4]) rotate([0,0,15]) standoff();
	translate([-31, -43/2+4]) rotate([0,0,-15]) standoff();

translate([-31,3.51/2]) circle(3/2, $fn = 30);
translate([-31,-3.51/2]) circle(3/2, $fn = 30);
translate([-31,3.51+3.51/2]) circle(3/2, $fn = 30);
translate([-31,-3.51-3.51/2]) circle(3/2, $fn = 30);

}

}
screwTerminalLid();
