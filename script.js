const postContainer = document.getElementById('post-container');
postContainer.style.fontSize = '30px'
postContainer.style.fontWeight = '800'
let markedReadCount =0 ;
const markedReadCountView  = document.getElementById('marked-read-count-view');

const showPosts = async() => {
    const res = await fetch(' https://openapi.programming-hero.com/api/retro-forum/posts');
    const data = await res.json();
    showPostInPage(data.posts);
}

showPosts();

const showPostInPage = (posts) => {
    postContainer.innerHTML = ``;
    if(posts.length > 0){
        for( post of posts){
        
            const element = document.createElement('div');
            element.classList.add('post');
            element.innerHTML = `
                <img src="${post.image ? post.image : noimg.png}" alt="" class="post-pic">
    
                        <div>
                            <div>
                                <p>#${post.category ? post.category : 'No category'}</p>
                                
                            </div>
                            <h4>${post.title ? post.title : 'No Title'}</h4>
                            <p>${ post.description ? post.description : 'No description'}</p>
                            <hr>
                            <div class="icons">
                                <div>
                                    <p><i class="fa-regular fa-message"></i> ${post.comment_count ? post.comment_count : '0'}</p>
                                    <p><i class="fa-regular fa-eye"></i> ${post.view_count ? post.view_count : '0'}</p>
                                    <p><i class="fa-regular fa-clock"></i></i> ${post.posted_time ? post.posted_time : '0'}</p>
                                </div>
                                <i onclick="addBookmark('${post.title}', '${post.view_count}')" class="fa-solid fa-bookmark"></i>
                            </div>
                        </div>
            `
    
            postContainer.appendChild(element);
        }
    }else{
        
        postContainer.innerText = 'No Post available'
    }

}
const markedReadContainer = document.getElementById('marked-read-container');
const addBookmark = (title, view_count) => {
    const element = document.createElement('div');
    element.classList.add('marked-read-post');
    element.innerHTML = `
      
                        <h4>${title}</h4>
                        <p><i class="fa-regular fa-eye"></i> ${view_count}</p>
                   
    `
    markedReadContainer.appendChild(element);
    markedReadCount++;
    markedReadCountView.innerText = markedReadCount;

}

const showLatestPost = async() => {

    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const data = await res.json();
    
    showLatestPostInPage(data);
}

showLatestPost();
const latestPostContainer = document.getElementById('latest-post-container')
const showLatestPostInPage = (posts) => {

    for(post of posts){

        const element = document.createElement('div');
        element.classList.add('latest-post')
        element.innerHTML = 
        `
        
                <img src="${post.cover_image ? post.cover_image : 'images/noimg.png'}"
                <p>${post.author.posted_date ? post.author.posted_date : 'Unknown'}</p>
                <p class="title">${post.title ? post.title : 'No Title'}</p>
                <p>${post.description ? post.description : ''}</p>

                <div class="namendes">
                    <img src="${post.profile_image ? post.profile_image : 'images/noimg.png'}" alt="">
                    <div>
                        <p class="name">${post.author.name ? post.author.name : 'Unnamed'}</p>
                        <p>${post.author.designation ? post.author.designation : 'Unknown'}</p>
                    </div>
                </div>
            
        `

        latestPostContainer.appendChild(element);
    }
}


const filterPosts = async() => {
    
    const searched = document.getElementById('search-box').value;
    console.log(searched);
    const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/posts?category=${searched}`);
    const data = await res.json();
    showPostInPage(data.posts);

}
