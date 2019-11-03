#include <stdio.h>

void go_south_east(int* lat, int* lon) {
	printf("Addresses cordinats in memory : [%p, %p].\n", lat, lon);
	--*lat;
	++*lon;
}


int main() {
	int latitude = 32;
	int longitude = -64;
	go_south_east(&latitude, &longitude);
	printf("Stop! Now our cordinats : [%i, %i].\n", latitude, longitude);
	return 0;
}
