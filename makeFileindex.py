import os

basePath = "./models/"
queue = os.listdir(basePath)
bigString = "["

def getChildren(filelist, path, level):
    global bigString
    obList = {"folderPath": basePath, "isDir": "1"}
    for ob in filelist:
        if ob.endswith(".glb") or (ob.find(".") == -1 and ob[0] != "_"):
            bigString = bigString + "\n" + level*"\t" + ob
            
            if (ob.find(".") == -1): #Folder
                newPath = path + ob + "/"
                nextGen = os.listdir(newPath)
                obList[ob] = getChildren(nextGen, newPath, level+1)
                obList[ob]["folderPath"] = newPath
                obList[ob]["isDir"] = "1"
            else: #is .glb file    
                obNoEnd = ob[:ob.find("."):]
                subfolder = path + "_" + obNoEnd
                try:
                    os.mkdir(path + "_" + obNoEnd)
                except FileExistsError:
                    1+1
                f = open(subfolder + "/annotations.txt", "a")
                obList[obNoEnd] = {"cad": path + ob, "thumbnail": subfolder + "/thumbnail.jpg", "isDir": "0", "annotations": subfolder + "/annotations.txt"}
                #beides soll kompletten Pfad ab ./models/ geben
                #hier eines tages auch animations
                print(ob)
    return obList
    
liste = getChildren(queue, basePath, 0)
print(liste)
#print(bigString + "]")

with open('fileindex.txt', 'w') as f:
    f.write(str(liste).replace("'", '"'))