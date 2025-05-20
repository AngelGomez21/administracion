function getfilePath (file){
    const filePath = file.path;
    const fileSplit = filePath.split("\\");
    const uploadsIndex = fileSplit.indexOf("uploads"); 
    if (uploadsIndex !== -1) {
        return fileSplit.slice(uploadsIndex).join("/");
    }
    return filePath; 
}

module.exports={
    getfilePath,
};