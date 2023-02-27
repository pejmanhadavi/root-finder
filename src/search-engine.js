import allBooksInArabics from './Holy-Books---Arabic-Alphabet.txt';
const stringSimilarity = require("string-similarity-js").stringSimilarity;


console.log('*****************', allBooksInArabics)
export default function Search(
    {mainRoots,
    wordMaxLength,
    useSimilarity,
    similarityPercent,
    couldOtherCharsExistBetweenRootsChars,
    shouldStartsWithRoots,
    firstIgnoredChars,
    lastIgnoredChars},) {
    
    similarityPercent = similarityPercent && similarityPercent / 100; 

    /**********
     * Read books
     */
    const arrayLines = allBooksInArabics.split('\n');

    const data = [];
    for(let i = 0 ; i < arrayLines.length ; i++)  {
        const arrayOfWords = arrayLines[i].split(' ');
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
                arrayLines[i] = arrayLines[i].replace(initialWord, `<<* ${initialWord} *>>`)


                data.push(arrayLines[i]);
            }
        })
    }
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