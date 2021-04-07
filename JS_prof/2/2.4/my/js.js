class Button {
    constructor(url) {
        this.url = url
    }

    init() {
        const promise = new Promise((resolve, reject) => {
            fetch(this.url)
                .then(result => result.json())
                .then(data => resolve(data.result));
        });
        
        promise.then(text => alert(text));
    }
}


// document.getElementById('btn1').addEventListener('click', () => {
//     const promise = new Promise((resolve, reject) => {
//         fetch('success.json')
//             .then(result => result.json())
//             .then(data => resolve(data.result))
//     });

//     promise.then(text => alert(text))
// });

// document.getElementById('btn2').addEventListener('click', () => {
//     const promise = new Promise((resolve, reject) => {
//         fetch('error.json')
//             .then(result => result.json())
//             .then(data => resolve(data.result))
//     });

//     promise.then(text => alert(text))
// });

