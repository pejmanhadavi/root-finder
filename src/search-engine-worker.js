// import { holyBooksArabicText } from './data/holy-books-arabic-alphabet'
// import { holyBooksTrueText } from '../data/holy-books-true-lang';
// import { stringSimilarity } from "string-similarity-js";


// eslint-disable-next-line no-restricted-globals
addEventListener('message', e => {
    const stringSimilarity = (str1, str2, substringLength, caseSensitive = false) => {
        if (!caseSensitive) {
            str1 = str1.toLowerCase();
            str2 = str2.toLowerCase();
        }
    
        if (str1.length < substringLength || str2.length < substringLength)
            return 0;
    
        const map = new Map();
        for (let i = 0; i < str1.length - (substringLength - 1); i++) {
            const substr1 = str1.substr(i, substringLength);
            map.set(substr1, map.has(substr1) ? map.get(substr1) + 1 : 1);
        }
    
        let match = 0;
        for (let j = 0; j < str2.length - (substringLength - 1); j++) {
            const substr2 = str2.substr(j, substringLength);
            const count = map.has(substr2) ? map.get(substr2) : 0;
            if (count > 0) {
                map.set(substr2, count - 1);
                match++;
            }
        }
    
        return (match * 2) / (str1.length + str2.length - ((substringLength - 1) * 2));
    };

    const Search = (
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


        const translitrationsLinesArray = holyBooksArabicText.split('\n');
        const trueLangsLinesArray = holyBooksTrueText.split('\n');
        const persianTranslationLinesArray = holyBooksPersianText.split('\n');
        similarityPercent = similarityPercent && similarityPercent / 100;

        /**********
         * Read books
         */

        const data = [];
        for (let i = 0; i < translitrationsLinesArray.length; i++) {
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
            })
        }
        return data;
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

    const result = Search(e.data)
    postMessage(result);


});
