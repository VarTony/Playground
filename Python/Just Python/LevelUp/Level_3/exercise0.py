import os, os.path, sys

data = sys.argv[1]

def createFiles (c=10) :
    i = len([name for name in os.listdir('.') if os.path.isfile(name)]) + 1
    print('count of files before: ', i-1)
    while(i <= c):
        file = open("exercise"+str(i-1)+".py", "w")
        file.write("print('exercise"+str(i-1)+".py')")
        file.close()
        i+=1

    print('And after: ',len([name for name in os.listdir('.') if os.path.isfile(name)]))

createFiles(int(data))
