import os

basePath = "./models/"
queue = os.listdir(basePath)
bigString = "["

def getChildren(filelist, path, level):
    global bigString
    obList = {"folderPath": basePath, "isDir": "1"}
    for ob in filelist:
        if ob.endswith(".glb") or ob.find(".") == -1:
            bigString = bigString + "\n" + level*"\t" + ob
            
            if (ob.find(".") == -1):
                newPath = path + ob + "/"
                nextGen = os.listdir(newPath)
                obList[ob] = getChildren(nextGen, newPath, level+1)
                obList[ob]["folderPath"] = newPath
                obList[ob]["isDir"] = "1"
            else:
                obNoEnd = ob[:ob.find("."):]
                obList[obNoEnd] = {"cad": path + ob, "thumbnail": path + obNoEnd + ".jpg", "isDir": "0"}
                #beides soll kompletten Pfad ab ./models/ geben
    return obList
    
liste = getChildren(queue, basePath, 0)
print(liste)
#print(bigString + "]")

with open('fileindex.txt', 'w') as f:
    f.write(str(liste).replace("'", '"'))