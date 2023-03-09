import { booksData } from './data/books-data';
import { stringSimilarity } from 'string-similarity-js';

export const Search = (
    { mainRoots = [],
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
        setTimeout(() => {
            similarityPercent = similarityPercent && similarityPercent / 100;
    
            /**********
             * Read books
             */
    
            const data = [];
            booksData.forEach(lineData => {
                if (usedBooks.length && !usedBooks.some(item => lineData.bookShortKey === item)) return;
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
                        lineData = {
                            ...lineData,
                            translation: translation,
                            selected: true,
                        };
                    }
                }
    
                if (mainRoots.length && lineData.translitration) {
                    const arrayOfWords = lineData.translitration.split(' ');
                    arrayOfWords.forEach((word, index) => {
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
                            arrayOfWords[index] = `{${initialWord}}`;
                            lineData = {
                                ...lineData,
                                translitration: arrayOfWords.join(' '),
                                selected: true,
                            };
                        }
                    });
                }
                // Here should push in array
                if (lineData.selected)
                    data.push(lineData)
            });
            resolve(data);
        }, 0);
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


