import { useState } from "react";

const useLocalStorage = (keyName, defaultValue) => {

    const [storedValue, setStoredValue] = useState(() => {
        try {
            const value = window.localStorage.getItem(keyName);
            if (value) {
                return JSON.parse(value);
            } else {
                window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
                return defaultValue;
            }
        } catch (err) {
            return defaultValue;
        }
    });

    const setValue = (newValue) => {
        try {
            window.localStorage.setItem(keyName, JSON.stringify(newValue));
        }
        catch (err) {
            console.log(err);
        }
        setStoredValue(newValue);
    };
    return [storedValue, setValue];
};

export default useLocalStorage;

// import { useState } from "react";

// const useLocalStorage = (key, initialValue) => {

//     console.log("useLocalStorage");
//     const [storedValue, setStoredValue] = useState(() => {
//         try {
//             const item = window.localStorage.getItem(key);

//             console.log(item)
//             return item ? JSON.parse(item) : initialValue;
//         } catch (error) {
//             console.log(error);

//             return initialValue;
//         }
//     });

//     const setValue = (value) => {
//         console.log(value);
//         try {
//             const valueToStore = value instanceof Function ? value(storedValue) : value;
//             console.log(valueToStore)

//             setStoredValue(valueToStore);

//             window.localStorage.setItem(key, JSON.stringify(valueToStore));
//         } catch (error) {
//             console.log(error);
//         }
//     };

//     return [storedValue, setValue];
// }

// export default useLocalStorage;


// import { useState } from "react";

// const useLocalStorage = (keyName, defaultValue) => {

//     const [storedValue, setStoredValue] = useState(() => {
//         try {
//             const value = window.localStorage.getItem(keyName);
//             if (value) {
//                 return JSON.parse(value);
//             } else {
//                 window.localStorage.setItem(keyName, JSON.stringify(defaultValue));
//                 return defaultValue;
//             }
//         } catch (err) {
//             return defaultValue;
//         }
//     });

//     const setValue = (newValue) => {
//         try {
//             window.localStorage.setItem(keyName, JSON.stringify(newValue));
//         }
//         catch (err) {
//             console.log(err);
//         }
//         setStoredValue(newValue);
//     };
//     return [storedValue, setValue];
// };

// export default useLocalStorage;

