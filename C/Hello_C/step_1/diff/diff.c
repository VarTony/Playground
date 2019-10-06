#include <stdio.h>
#include <stdlib.h>

int square(float x) {
    return x * x;
};

float diff(int x, float dx, int (f)(float)) {
    return (f(x + dx) - f(x))/dx;
}

float main() {
    float result = diff(10, 1e-10, square);
    sprintf(result);
    return result;
}

