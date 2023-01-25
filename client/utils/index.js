import { surpriseMePrompts } from "../constant";
//import FileSaver from "file-saver"

export const getRandomPrompt =  ( prompt ) => {
    const randomIndex = Math.floor(Math.random() * surpriseMePrompts.length);

    const randomPrompt = surpriseMePrompts[randomIndex];

    //check we dont get the same prompt two times in row
    if(randomPrompt === prompt) {
        return getRandomPrompt(prompt);
    }
    return randomPrompt ;

}

// export async function downloadImage(_id , photo){
//     FileSaver.saveAs(photo , `download-${_id}.jpg`);
// }