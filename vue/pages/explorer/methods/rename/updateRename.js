// import {
//     find
// } from "~/modules";
import Vue from "vue";
import patternToName from "./src/patternToName";

module.exports = function updateRename() {
    let renamePattern = this.renamePattern;
    let files = this.explorerData["@scroll"].files;

    files.filter((file) => {
        return file[0].count !== 0;
    }).forEach((file, index, filesArray) => {
        file[0].renameIndex = 0;
        if (index === 0) file[0].renameIndex = 0;
        else {
            file[0].renameIndex =
                filesArray[index - 1][0].renameIndex +
                filesArray[index - 1][0].count;
        }
        Vue.set(file[7], "name", patternToName(renamePattern, file));
    });
    for (let i = 0; i < files.length; i++) {
        Vue.set(files[i][2], "error", false);
        Vue.set(files[i][7], "error", false);
        Vue.set(files[i][7], "converted", false);
        if (this.explorerMode !== "renameMode") continue;
        let iName = files[i][2].name,
            iRename = files[i][7].name,
            iCount = files[i][0].count,
            i_ = iCount ? iRename : iName;
        for (let j = 0; j < i; j++) {
            let jName = files[j][2].name,
                jRename = files[j][7].name,
                jCount = files[j][0].count,
                j_ = jCount ? jRename : jName;
            if (i_ === j_) {
                if (i_ === iName) {
                    Vue.set(files[i][2], "error", "true");
                } else if (i_ === iRename) {
                    Vue.set(files[i][7], "error", "true");
                }

                if (j_ === jName) {
                    Vue.set(files[j][2], "error", "true");
                } else if (j_ === jRename) {
                    Vue.set(files[j][7], "error", "true");
                }
            }
        }
    }
};
