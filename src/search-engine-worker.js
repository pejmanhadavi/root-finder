import { holyBooksArabicText } from './data/holy-books-arabic-text'
import { holyBooksTrueText } from './data/holy-books-true-text';
import { holyBooksPersianText } from './data/holy-books-persian-text';
import { stringSimilarity } from "string-similarity-js";

export const Search = (
    { mainRoots = {},
        wordMaxLength = 0,
        useSimilarity = 0,
        similarityPercent = 0,
        couldOtherCharsExistBetweenRootsChars = 0,
        shouldStartsWithRoots = 0,
        firstIgnoredChars = [],
        lastIgnoredChars = [],
        usedBooks = [],
    }) => {


    return new Promise(resolve => {
        const translitrationsLinesArray = holyBooksArabicText.split('\n');
        const trueLangsLinesArray = holyBooksTrueText.split('\n');
        const persianTranslationLinesArray = holyBooksPersianText.split('\n');
        similarityPercent = similarityPercent && similarityPercent / 100;

        /**********
         * Read books
         */

        const data = [];
        translitrationsLinesArray.forEach(translitraionLine => {
            if (usedBooks.length && !usedBooks.some(item => translitraionLine.includes(item))) return;
            const address = translitraionLine.substring(0, 16);
            const translitrationVerse = translitraionLine.substring(16);
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
                    const trueLangVerse = trueLangsLinesArray.find(line => line.includes(address))?.substring(15);
                    // console.log(persianTranslationLinesArray);
                    const persianVerse = persianTranslationLinesArray.find(line => line.includes(address))?.substring(15);
                    const dataLine = {
                        address,
                        trueLang: trueLangVerse,
                        translitration: translitrationVerse.replace(initialWord, `{${initialWord}}`),
                        translation: persianVerse,
                    };
                    data.push(dataLine);
                }
                resolve(data);
            })
        });
    })
}

const compareStringsWithBetweenChars = (root, word) => {
    const rootChars = root.split('');
    for (let i = 0; i < rootChars.length; i++) {
        if (word.includes(rootChars[i]))
            word = word.substring(word.indexOf(rootChars[i]) + 1);
        else {
            return false
        }
    }
    return true
};