import { data as booksData } from './data/data-object';
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
        translationWords = [],
    }) => {


    return new Promise(resolve => {
        similarityPercent = similarityPercent && similarityPercent / 100;

        /**********
         * Read books
         */

        const data = [];
        booksData.forEach(lineData => {
            if (usedBooks.length && !usedBooks.some(item => lineData.bookShortKey === item)) return;
            const arrayOfWords = lineData.translitration.split(' ');
            /********
             * Check if there is translation contains one of users translations search words
             */
            if (translationWords.length && lineData.translation) {
                const words = translationWords.filter(item => lineData.translation.includes(item));
                if (words.length) {
                    let translation = lineData.translation;
                    words.forEach(word => {
                        translation = translation.replaceAll(word, `{${word}}`)
                    });
                    data.push({
                        address: `${lineData.bookShortKey}, ${lineData.chapterNumber}, ${lineData.verseNumber}`,
                        trueLang: lineData.trueText,
                        translitration: lineData.translitration,
                        translation: translation,
                    });
                }
            }

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
                    data.push({
                        address: `${lineData.bookShortKey}, ${lineData.chapterNumber}, ${lineData.verseNumber}`,
                        trueLang: lineData.trueText,
                        translitration: lineData.translitration.replace(initialWord, `{${initialWord}}`),
                        translation: lineData.translation,
                    });
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