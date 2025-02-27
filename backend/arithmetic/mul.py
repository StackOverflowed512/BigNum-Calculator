from math import ceil, floor
#math.ceil(x) Return the ceiling of x as a float, the smallest integer value greater than or equal to x.
#math.floor(x) Return the floor of x as a float, the largest integer value less than or equal to x.

def karatsuba(x,y):

    #base case
    if x < 10 and y < 10: # in other words, if x and y are single digits
        return x*y
    
    n = max(len(str(x)), len(str(y)))
    m = ceil(n/2)   #Cast n into a float because n might lie outside the representable range of integers.

    x_H  = floor(x / 10**m)
    x_L = x % (10**m)

    y_H = floor(y / 10**m)
    y_L = y % (10**m)

    #recursive steps
    a = karatsuba(x_H,y_H)
    d = karatsuba(x_L,y_L)
    e = karatsuba(x_H + x_L, y_H + y_L) - a - d

    return int(a*(10**(m*2)) + e*(10**m) + d)

def digits(x,y):
    d1 = len(str(x))
    d2 = len(str(y))
    return d1, d2

'''Test Cases'''
# print(karatsuba(12,12))
# print(karatsuba(0,0))
# print(karatsuba(1234,4321))
# print(karatsuba(3141592653589793238462643383279502884197169399375105820974944592,
#               2718281828459045235360287471352662497757247093699959574966967627))
# print(digits(3141592653589793238462643383279502884197169399375105820974944592,
#               2718281828459045235360287471352662497757247093699959574966967627))