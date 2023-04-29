// make a function in fetching the post

const apiUrl  = 'https://jsonplaceholder.typicode.com'

async function fetchPosts(){
    // put the function in a try catch
    try{
    // get request dont have request body
    // fetch returns a promise, there we wont use this code below
    //const response = fetch('https://jsonplaceholder.typicode.com/posts')
    // a promise returns response in the future which can be a seconds
    // therefore, we use await
    const response = await fetch(`${apiUrl}/posts`)
    
    // using await we add async to the function

    // incase of server error or something is wrong
    // to check for response code 200 ok
     if(!response.ok){
        throw new Error(`failed to fetch posts:${response.status}`)
    }

    return await response.json()
    // because we are expecting to return the codes in json format
}catch(e){
    console.log(e)
}

}

// This function is for listing the post
function listsPosts(postContainerElementId){
    // this is the section of the container element in the html using the id
    const postContainerElement = document.getElementById
    (postContainerElementId)
    // we check the condition
    if(!postContainerElement){
        return
    }
    // we call the fetchPosts function here
    fetchPosts().then((posts) =>{

        // chech the condition
        if(!posts){
            postContainerElement.innerHTML = 'No posts fetched.'
            return
        }
        // if however there are post use forloop

        for(const post of posts){
            postContainerElement.appendChild(postElement(post))
        }
    }).catch((e) =>{
        console.log(e)
    })
}

// create another function to take one of the post item
function postElement(post){
    // here we do DOM manupulation by using an anchor element 
    //that for the link
    const anchorElement = document.createElement('a')
    // this is how you create an html element
    // and we can check attribute for href link
    anchorElement.setAttribute('href', `${apiUrl}/posts/${post.id}`)
    // to click on a post and open in another tap
    anchorElement.setAttribute('target', '_blank')
    // this is post title
    anchorElement.innerText = capitaliseFirstLetter(post.title)

    // to make h3 to include a link

    const postTitleElement = document.createElement('h3')
    // this will insert the anchor element into the post title element
    postTitleElement.appendChild(anchorElement)

    return postTitleElement
}
// function capitalise first letter

function capitaliseFirstLetter(str){
    return str.charAt(0).toUpperCase() + str.slice(1)

}