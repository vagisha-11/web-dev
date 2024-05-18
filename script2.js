document.addEventListener('DOMContentLoaded', function() {
    // Log a message to confirm that the DOMContentLoaded event is fired
    console.log('DOMContentLoaded event fired');
    
    // Add event listener for the dropdown button click
    const dropbtn = document.querySelector('.dropbtn');
    const dropdownContent = document.querySelector('.dropdown-content');

    // Log the dropdown button and dropdown content to check if they are selected correctly
    console.log('Dropdown button:', dropbtn);
    console.log('Dropdown content:', dropdownContent);

    dropbtn.addEventListener('click', function() {
        // Toggle the display of the dropdown content
        dropdownContent.classList.toggle('show');

        // Log a message to confirm that the click event is fired
        console.log('Dropdown button clicked');
    });
});







document.addEventListener('DOMContentLoaded', function() {
    fetchBlogData();
});

async function fetchBlogData() {
    try {
        const response = await fetch('https://coding-week-2024-api.onrender.com/api/data');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data); // Log the data to inspect its structure
        renderFeaturedBlogs(data.slice(0, 4)); // Display the first 4 blog posts in the featured section
        renderNewsPanel(data.slice(4, 10)); // Display the next 6 blog posts in the news panel's news list
    } catch (error) {
        console.error('Failed to fetch blog data:', error);
    }
}

function renderFeaturedBlogs(blogData) {
    const featuredBlogs = document.querySelector('.featured-blogs');
    blogData.forEach(blog => {
        const blogElement = createBlogElement(blog);
        featuredBlogs.appendChild(blogElement);
    });
}

function renderNewsPanel(newsData) {
    const newsList = document.querySelector('.news-list');
    newsData.forEach(news => {
        const newsItem = createNewsItem(news);
        newsList.appendChild(newsItem);
    });
}

function createBlogElement(blog) {
    const article = document.createElement('article');
    article.classList.add('blog-post');

    article.addEventListener('click', async () => {
        try {
            // Fetch the extra new content from the API based on blog ID or any unique identifier
            const contentResponse = await fetch(`https://coding-week-2024-api.onrender.com/api/data${blog.id}`);
            if (!contentResponse.ok) {
                throw new Error('Failed to fetch blog content');
            }
            const contentData = await contentResponse.json();
            // Display only the extra new content in an alert box
            alert(contentData.content.extraNewContent);
        } catch (error) {
            console.error('Error fetching blog content:', error);
        }
    });

    const img = document.createElement('img');
    img.src = blog.image;
    img.alt = 'Blog Post';
    img.classList.add('thumbpin');
    article.appendChild(img);

    const overlay = document.createElement('div');
    overlay.classList.add('overlay');

    overlay.innerHTML = `
    
    <div class="heading">
        <h2>${blog.headline}</h2>
        <div class="tags">
            <span class="featured-tag">Featured</span>
            <span class="type-tag">${blog.type}</span>
        </div>
    </div>
    <span class="date">
        <i class="fas fa-calendar-alt"></i> ${blog.date}
    </span>
    <div class="author">
        <p>${blog.author}</p>
`;

    article.appendChild(overlay);
    return article;
}

function createNewsItem(blog) {
    const li = document.createElement('li');
    li.classList.add('news-item');

    const img = document.createElement('img');
    img.src = blog.image;
    img.alt = 'News Image';
    img.classList.add('thumbpin');
    li.appendChild(img);

    const div = document.createElement('div');
    div.classList.add('news-content');

    const h3 = document.createElement('h3');
    h3.textContent = blog.headline;
    div.appendChild(h3);

    const dateSpan = document.createElement('span');
    dateSpan.classList.add('news-date');
    const calendarIcon = document.createElement('i');
    calendarIcon.classList.add('fas', 'fa-calendar-alt');
    dateSpan.appendChild(calendarIcon);
    dateSpan.innerHTML += ` ${blog.date}`;
    div.appendChild(dateSpan);

    li.appendChild(div);
    return li;
}
/*...........................................*/

