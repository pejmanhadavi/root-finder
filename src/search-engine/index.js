import { holyBooksArabicText } from './data/holy-books-arabic-alphabet'
// import { holyBooksTrueText } from '../data/holy-books-true-lang';
import { stringSimilarity } from "string-similarity-js";



export default function Search(
    {mainRoots = {},
    wordMaxLength = 0,
    useSimilarity = 0,
    similarityPercent = 0,
    couldOtherCharsExistBetweenRootsChars = 0,
    shouldStartsWithRoots = 0,
    firstIgnoredChars = [],
    lastIgnoredChars = [],
    usedBooks = [],
}) {

    
    const translitrationsLinesArray = holyBooksArabicText.split('\n');
    // const trueLangsLinesArray = holyBooksTrueText.split('\n');
    similarityPercent = similarityPercent && similarityPercent / 100; 

    /**********
     * Read books
     */

    const data = [];
    for(let i = 0 ; i < translitrationsLinesArray.length ; i++)  {
        if (usedBooks.length && !usedBooks.some(item => translitrationsLinesArray[i].includes(item))) continue;
        const address = translitrationsLinesArray[i].substring(0, 16);
        const translitrationVerse = translitrationsLinesArray[i].substring(16, translitrationsLinesArray[i].length);
        const arrayOfWords = translitrationVerse.split(' ');
        
        arrayOfWords.forEach(word => {
            const initialWord = word;
            /********
             * Remove first chars
             */
            for (let i = 0; i < firstIgnoredChars.length; i++) {
                word = word.startsWith(firstIgnoredChars[i]) ? word.substring(firstIgnoredChars[i].length) : word;
            }

            /********
             * Remove last chars
             */
            for (let i = 0; i < lastIgnoredChars.length; i++) {
                word = word.endsWith(lastIgnoredChars[i]) ? word.slice(0, lastIgnoredChars[i].length) : word;
            }


            if (
                /*********
                 * Check betweenChars
                 */
                (couldOtherCharsExistBetweenRootsChars ? mainRoots.some(root => compareStringsWithBetweenChars(root, word)) :
                    /*******
                     * Check similarity
                     */
                    (useSimilarity ?
                        mainRoots.some(root => stringSimilarity(root, word, 1) > similarityPercent) :
                        /*********
                         * Check including
                         */
                        mainRoots.some(root => word.includes(root))))
                &&
                /*********
                 * Check length
                 */
                (wordMaxLength ? word.length <= wordMaxLength : true)
                &&
                /********
                 * Check if it starts with roots
                 */
                (shouldStartsWithRoots ? mainRoots.some(root => word.startsWith(root)) : true)
            ) {
                /*******
                 * Mention word in verses
                 */
                // const trueLangVerse = trueLangsLinesArray.find(line => line.includes(address)).substring(15, translitrationsLinesArray[i].length);
                const dataLine = {
                    address,
                    // trueLang: trueLangVerse,
                    translitration: translitrationVerse.replace(initialWord, `{${initialWord}}`),
                    // translation: 'test translations',
                };
                data.push(dataLine);
            }
        })
    }
    return data;
}

function compareStringsWithBetweenChars(root, word) {
    const rootChars = root.split('');
    for (let i = 0; i < rootChars.length; i++) {
        if (word.includes(rootChars[i]))
            word = word.substring(rootChars[i].length)
        else {
            return false
        }
    }
    return true
};

// eslint-disable-next-line no-restricted-globals
addEventListener('message', e => {
    if (e.data === 'hello') {
      postMessage('hiya!');
    }
});