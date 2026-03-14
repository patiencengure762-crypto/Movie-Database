// Movie Database Application - Sinema Yetu

class MovieDatabase {
    constructor() {
        this.movies = this.loadMoviesFromStorage();
        this.favorites = this.loadFavoritesFromStorage();
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadSampleMovies();
        this.renderMovies();
        this.renderFeaturedMovies();
        this.renderGenreSection('Romance', 'romanceMovies');
        this.renderGenreSection('Horror', 'horrorMovies');
        this.updateStats();
    }

    setupEventListeners() {
        document.getElementById('movieForm').addEventListener('submit', (e) => this.addMovie(e));
        document.getElementById('searchBox').addEventListener('input', () => this.filterAndSort());
        document.getElementById('filterGenre').addEventListener('change', () => this.filterAndSort());
        document.getElementById('sortBy').addEventListener('change', () => this.filterAndSort());
        document.getElementById('clearFilters').addEventListener('click', () => this.clearFilters());
        document.getElementById('favoriteBtn')?.addEventListener('click', () => this.toggleFavoritesSection());
    }

    loadSampleMovies() {
        if (this.movies.length === 0) {
            const sampleMovies = [
                {
                    id: this.generateId(),
                    title: "Rafiki",
                    year: 2018,
                    director: "Wanuri Kahiu",
                    genre: "Drama",
                    rating: 8.2,
                    country: "Kenya",
                    description: "A tender love story between two young girls in Nairobi."
                },
                {
                    id: this.generateId(),
                    title: "Inception",
                    year: 2010,
                    director: "Christopher Nolan",
                    genre: "Sci-Fi",
                    rating: 8.8,
                    country: "USA/UK",
                    description: "A skilled thief who specializes in extraction is given the inverse task of implanting an idea."
                },
                {
                    id: this.generateId(),
                    title: "Supa Modo",
                    year: 2018,
                    director: "Likarion Wainaina",
                    genre: "Drama",
                    rating: 8.3,
                    country: "Kenya",
                    description: "A terminally ill girl's final wish is to be a superhero."
                },
                {
                    id: this.generateId(),
                    title: "Black Panther: Wakanda Forever",
                    year: 2022,
                    director: "Ryan Coogler",
                    genre: "Action",
                    rating: 8.1,
                    country: "USA",
                    description: "The kingdom of Wakanda faces off against global powers as they mourn the loss of their king."
                },
                {
                    id: this.generateId(),
                    title: "The Constant Gardener",
                    year: 2005,
                    director: "Fernando Meirelles",
                    genre: "Thriller",
                    rating: 8.0,
                    country: "Kenya/UK",
                    description: "A British diplomat investigates his wife's murder in Kenya."
                },
                {
                    id: this.generateId(),
                    title: "Parasite",
                    year: 2019,
                    director: "Bong Joon-ho",
                    genre: "Drama",
                    rating: 8.6,
                    country: "South Korea",
                    description: "Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan."
                },
                {
                    id: this.generateId(),
                    title: "Nairobi Half Life",
                    year: 2012,
                    director: "David Onsongo",
                    genre: "Drama",
                    rating: 7.8,
                    country: "Kenya",
                    description: "A young man navigates the dangerous streets of Nairobi."
                },
                {
                    id: this.generateId(),
                    title: "The Shawshank Redemption",
                    year: 1994,
                    director: "Frank Darabont",
                    genre: "Drama",
                    rating: 9.3,
                    country: "USA",
                    description: "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency."
                },
                {
                    id: this.generateId(),
                    title: "Forbidden Fruit",
                    year: 2012,
                    director: "Wanuri Kahiu",
                    genre: "Romance",
                    rating: 7.5,
                    country: "Kenya",
                    description: "A romantic comedy about forbidden love in Kenya."
                },
                {
                    id: this.generateId(),
                    title: "Everything Everywhere All at Once",
                    year: 2022,
                    director: "Daniel Kwan, Daniel Scheinert",
                    genre: "Comedy",
                    rating: 8.9,
                    country: "USA",
                    description: "An aging Chinese immigrant is swept up in an insane adventure where she alone can save the world by exploring other universes."
                },
                {
                    id: this.generateId(),
                    title: "Spirited Away",
                    year: 2001,
                    director: "Hayao Miyazaki",
                    genre: "Documentary",
                    rating: 8.6,
                    country: "Japan",
                    description: "During her family's move, a sullen girl wanders into a world ruled by gods, witches, and spirits."
                },
                {
                    id: this.generateId(),
                    title: "Oppenheimer",
                    year: 2023,
                    director: "Christopher Nolan",
                    genre: "Drama",
                    rating: 8.3,
                    country: "USA/UK",
                    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II."
                },
                {
                    id: this.generateId(),
                    title: "The Dark Knight",
                    year: 2008,
                    director: "Christopher Nolan",
                    genre: "Action",
                    rating: 9.0,
                    country: "USA/UK",
                    description: "Batman faces a new criminal mastermind who wants to plunge the city into anarchy."
                },
                {
                    id: this.generateId(),
                    title: "Interstellar",
                    year: 2014,
                    director: "Christopher Nolan",
                    genre: "Sci-Fi",
                    rating: 8.6,
                    country: "USA/UK",
                    description: "A team of astronauts travel through a wormhole in space to ensure humanity's survival."
                },
                {
                    id: this.generateId(),
                    title: "The Lion King",
                    year: 2019,
                    director: "Jon Favreau",
                    genre: "Comedy",
                    rating: 7.6,
                    country: "USA",
                    description: "A young lion flees his kingdom only to learn the true meaning of responsibility and takes back what is his."
                },
                {
                    id: this.generateId(),
                    title: "Pulp Fiction",
                    year: 1994,
                    director: "Quentin Tarantino",
                    genre: "Drama",
                    rating: 8.9,
                    country: "USA",
                    description: "The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption."
                },
                {
                    id: this.generateId(),
                    title: "Avengers: Endgame",
                    year: 2019,
                    director: "Anthony & Joe Russo",
                    genre: "Action",
                    rating: 8.4,
                    country: "USA",
                    description: "After the devastating events, the Avengers assemble once more in order to reverse Thanos' actions and restore balance."
                },
                {
                    id: this.generateId(),
                    title: "The Godfather",
                    year: 1972,
                    director: "Francis Ford Coppola",
                    genre: "Drama",
                    rating: 9.2,
                    country: "USA",
                    description: "The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son."
                },
                {
                    id: this.generateId(),
                    title: "Dune",
                    year: 2021,
                    director: "Denis Villeneuve",
                    genre: "Sci-Fi",
                    rating: 8.0,
                    country: "USA/Canada",
                    description: "Paul Atreides travels to the mysterious planet Arrakis to ensure the safety of his family and fortune."
                },
                {
                    id: this.generateId(),
                    title: "Joker",
                    year: 2019,
                    director: "Todd Phillips",
                    genre: "Drama",
                    rating: 8.4,
                    country: "USA",
                    description: "In Gotham City, a struggling comedian is disregarded and mistreated by society and turns to a life of crime and chaos."
                },
                {
                    id: this.generateId(),
                    title: "Top Gun: Maverick",
                    year: 2022,
                    director: "Joseph Kosinski",
                    genre: "Action",
                    rating: 8.3,
                    country: "USA",
                    description: "After thirty years, Maverick is back in the cockpit to train a new generation of fighting pilots."
                },
                {
                    id: this.generateId(),
                    title: "The Matrix",
                    year: 1999,
                    director: "Lana Wachowski, Lilly Wachowski",
                    genre: "Sci-Fi",
                    rating: 8.7,
                    country: "USA/Australia",
                    description: "A computer hacker learns that reality as he knows it is a simulation created by intelligent machines."
                },
                {
                    id: this.generateId(),
                    title: "Gladiator",
                    year: 2000,
                    director: "Ridley Scott",
                    genre: "Action",
                    rating: 8.5,
                    country: "USA/Malta",
                    description: "A former Roman General sets out to exact vengeance against the corrupt emperor who murdered his family."
                },
                {
                    id: this.generateId(),
                    title: "Forrest Gump",
                    year: 1994,
                    director: "Robert Zemeckis",
                    genre: "Drama",
                    rating: 8.8,
                    country: "USA",
                    description: "The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man."
                },
                {
                    id: this.generateId(),
                    title: "Whip It",
                    year: 2009,
                    director: "Drew Barrymore",
                    genre: "Comedy",
                    rating: 7.6,
                    country: "USA",
                    description: "A young girl joins a roller derby team and finds herself while pushing her personal boundaries."
                },
                {
                    id: this.generateId(),
                    title: "Blade Runner 2049",
                    year: 2017,
                    director: "Denis Villeneuve",
                    genre: "Sci-Fi",
                    rating: 8.0,
                    country: "USA/Canada",
                    description: "A young blade runner's discovery of a long-buried secret leads him to track down the missing creator of replicants."
                },
                {
                    id: this.generateId(),
                    title: "The Notebook",
                    year: 2004,
                    director: "Nick Cassavetes",
                    genre: "Romance",
                    rating: 7.8,
                    country: "USA",
                    description: "A poor yet passionate man falls in love with a rich woman and gives her a sense of freedom."
                },
                {
                    id: this.generateId(),
                    title: "Titanic",
                    year: 1997,
                    director: "James Cameron",
                    genre: "Romance",
                    rating: 7.8,
                    country: "USA",
                    description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic."
                },
                {
                    id: this.generateId(),
                    title: "The Conjuring",
                    year: 2013,
                    director: "James Wan",
                    genre: "Horror",
                    rating: 7.5,
                    country: "USA",
                    description: "Paranormal investigators work to help a family terrorized by a dark presence in their farmhouse."
                },
                {
                    id: this.generateId(),
                    title: "Insidious",
                    year: 2010,
                    director: "James Wan",
                    genre: "Horror",
                    rating: 7.2,
                    country: "USA",
                    description: "A family looks to prevent evil incarnate from taking over their son's body."
                },
                {
                    id: this.generateId(),
                    title: "A Quiet Place",
                    year: 2018,
                    director: "John Krasinski",
                    genre: "Horror",
                    rating: 7.5,
                    country: "USA",
                    description: "In a world-wide pandemic of virtual plague, families live in silence to protect themselves from creatures that hunt by sound."
                },
                {
                    id: this.generateId(),
                    title: "Pride and Prejudice",
                    year: 2005,
                    director: "Joe Wright",
                    genre: "Romance",
                    rating: 7.8,
                    country: "USA/UK",
                    description: "A spirited young woman with limited prospects is forced to mediate with her eccentric family as she encounters the proud Mr. Darcy."
                },
                {
                    id: this.generateId(),
                    title: "The Ring",
                    year: 2002,
                    director: "Gore Verbinski",
                    genre: "Horror",
                    rating: 7.1,
                    country: "USA",
                    description: "A journalist must investigate a mysterious videotape which kills anyone in a week of viewing it."
                },
                {
                    id: this.generateId(),
                    title: "La La Land",
                    year: 2016,
                    director: "Damien Chazelle",
                    genre: "Romance",
                    rating: 8.0,
                    country: "USA",
                    description: "While navigating their careers in Los Angeles, a pianist and an actress fall in love while pursuing their dreams."
                },
                {
                    id: this.generateId(),
                    title: "The Ring 2",
                    year: 2005,
                    director: "Hideo Nakata",
                    genre: "Horror",
                    rating: 6.0,
                    country: "USA",
                    description: "A teenage girl who died in a bathtub decades ago is yanking inhabitants of a Washington town into the water."
                },
                {
                    id: this.generateId(),
                    title: "Crazy Rich Asians",
                    year: 2018,
                    director: "Jon M. Chu",
                    genre: "Romance",
                    rating: 7.0,
                    country: "USA",
                    description: "An American woman of Chinese descent discovers her new boyfriend is the scion of one of the wealthiest families in Asia."
                },
                {
                    id: this.generateId(),
                    title: "Hereditary",
                    year: 2018,
                    director: "Ari Aster",
                    genre: "Horror",
                    rating: 7.6,
                    country: "USA",
                    description: "A family is haunted by their worst nightmare after the matriarch of the family passes away."
                },
                {
                    id: this.generateId(),
                    title: "P.S. I Love You",
                    year: 2007,
                    director: "Richard LaGravenese",
                    genre: "Romance",
                    rating: 7.0,
                    country: "USA/Ireland",
                    description: "A woman receives notes written by her late husband which send her on a life-changing journey around the world."
                },
                {
                    id: this.generateId(),
                    title: "Sinister",
                    year: 2012,
                    director: "Scott Derrickson",
                    genre: "Horror",
                    rating: 6.8,
                    country: "USA",
                    description: "Stranded by car trouble, a family is picked up by a group of people smugglers and must fight for survival."
                }
            ];

            sampleMovies.forEach(movie => this.movies.push(movie));
            this.saveMoviesToStorage();
            this.renderMovies();
            this.updateStats();
        }
    }

    addMovie(e) {
        e.preventDefault();

        const title = document.getElementById('movieTitle').value.trim();
        const year = document.getElementById('movieYear').value;
        const director = document.getElementById('movieDirector').value.trim();
        const genre = document.getElementById('movieGenre').value;
        const rating = parseFloat(document.getElementById('movieRating').value);
        const country = document.getElementById('movieCountry').value.trim();
        const description = document.getElementById('movieDescription').value.trim();

        if (!title || !genre) {
            alert('Please fill in the movie title and genre');
            return;
        }

        const newMovie = {
            id: this.generateId(),
            title,
            year: year ? parseInt(year) : new Date().getFullYear(),
            director: director || 'Unknown',
            genre,
            rating: rating || 0,
            country: country || 'Unknown',
            description: description || 'No description available'
        };

        this.movies.push(newMovie);
        this.saveMoviesToStorage();
        this.renderMovies();
        this.updateStats();
        document.getElementById('movieForm').reset();

        // Show success message
        this.showNotification('Movie added successfully!');
    }

    deleteMovie(id) {
        if (confirm('Are you sure you want to delete this movie?')) {
            this.movies = this.movies.filter(movie => movie.id !== id);
            this.saveMoviesToStorage();
            this.filterAndSort();
            this.showNotification('Movie deleted successfully!');
        }
    }

    filterAndSort() {
        let filtered = [...this.movies];
        const searchTerm = document.getElementById('searchBox').value.toLowerCase();
        const selectedGenre = document.getElementById('filterGenre').value;
        const sortBy = document.getElementById('sortBy').value;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm) ||
                movie.director.toLowerCase().includes(searchTerm) ||
                movie.country.toLowerCase().includes(searchTerm)
            );
        }

        // Genre filter
        if (selectedGenre) {
            filtered = filtered.filter(movie => movie.genre === selectedGenre);
        }

        // Sorting
        switch (sortBy) {
            case 'rating-desc':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'rating-asc':
                filtered.sort((a, b) => a.rating - b.rating);
                break;
            case 'year-desc':
                filtered.sort((a, b) => b.year - a.year);
                break;
            case 'year-asc':
                filtered.sort((a, b) => a.year - b.year);
                break;
            case 'name-asc':
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
        }

        this.renderMovies(filtered);
    }

    clearFilters() {
        document.getElementById('searchBox').value = '';
        document.getElementById('filterGenre').value = '';
        document.getElementById('sortBy').value = '';
        this.renderMovies();
    }

    renderMovies(moviesToRender = this.movies) {
        const moviesList = document.getElementById('moviesList');
        const emptyState = document.getElementById('emptyState');

        if (moviesToRender.length === 0) {
            moviesList.innerHTML = '';
            emptyState.style.display = 'block';
            return;
        }

        emptyState.style.display = 'none';
        moviesList.innerHTML = moviesToRender.map(movie => this.createMovieCard(movie)).join('');

        // Add delete event listeners
        document.querySelectorAll('.btn-delete').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('.movie-card').dataset.movieId;
                this.deleteMovie(id);
            });
        });

        // Add favorite event listeners
        document.querySelectorAll('.btn-favorite').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = e.target.closest('.movie-card').dataset.movieId;
                this.toggleFavorite(id);
            });
        });
    }

    createMovieCard(movie) {
        const stars = this.getStarRating(movie.rating);
        const emoji = this.getGenreEmoji(movie.genre);
        const isFavorite = this.favorites.includes(movie.id);

        return `
            <div class="movie-card" data-movie-id="${movie.id}">
                <div class="movie-poster">${emoji}
                    <button class="btn-favorite" title="Add to Favorites">${isFavorite ? '❤️' : '🤍'}</button>
                </div>
                <div class="movie-content">
                    <h3 class="movie-title">${this.escapeHtml(movie.title)}</h3>
                    <div class="movie-meta">
                        <span class="movie-genre">${movie.genre}</span>
                        <span class="movie-rating">
                            <span class="stars">${stars}</span>
                            ${movie.rating.toFixed(1)}
                        </span>
                    </div>
                    <p class="movie-director">📽️ ${this.escapeHtml(movie.director)}</p>
                    <p class="movie-meta" style="color: #666; font-size: 0.85em;">
                        ${movie.year} • ${this.escapeHtml(movie.country)}
                    </p>
                    <p class="movie-description">${this.escapeHtml(movie.description)}</p>
                    <div class="movie-actions">
                        <button class="btn-delete">Delete</button>
                    </div>
                </div>
            </div>
        `;
    }

    getStarRating(rating) {
        const fullStars = Math.floor(rating / 2);
        const hasHalfStar = (rating % 2) >= 1;
        let stars = '★'.repeat(fullStars);
        if (hasHalfStar) stars += '½';
        return stars;
    }

    getGenreEmoji(genre) {
        const emojiMap = {
            'Drama': '🎭',
            'Action': '💥',
            'Comedy': '😂',
            'Thriller': '😱',
            'Documentary': '📺',
            'Romance': '💕',
            'Horror': '🔪',
            'Sci-Fi': '🚀'
        };
        return emojiMap[genre] || '🎬';
    }

    updateStats() {
        const totalMovies = this.movies.length;
        const avgRating = totalMovies > 0 
            ? (this.movies.reduce((sum, m) => sum + m.rating, 0) / totalMovies).toFixed(1)
            : 0;
        const topMovies = this.movies.filter(m => m.rating >= 8).length;

        document.getElementById('totalMovies').textContent = totalMovies;
        document.getElementById('avgRating').textContent = avgRating;
        document.getElementById('topMovies').textContent = topMovies;
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #ff6b35;
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;

        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    saveMoviesToStorage() {
        localStorage.setItem('movies', JSON.stringify(this.movies));
    }

    loadMoviesFromStorage() {
        const stored = localStorage.getItem('movies');
        return stored ? JSON.parse(stored) : [];
    }

    toggleFavorite(id) {
        const index = this.favorites.indexOf(id);
        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(id);
        }
        this.saveFavoritesToStorage();
        this.renderMovies();
        this.renderFeaturedMovies();
    }

    saveFavoritesToStorage() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    loadFavoritesFromStorage() {
        const stored = localStorage.getItem('favorites');
        return stored ? JSON.parse(stored) : [];
    }

    renderFeaturedMovies() {
        const featured = document.getElementById('featuredMovies');
        if (!featured) return;
        
        const topRated = [...this.movies].sort((a, b) => b.rating - a.rating).slice(0, 4);
        featured.innerHTML = topRated.map(movie => `
            <div class="featured-card">
                <div class="featured-poster">${this.getGenreEmoji(movie.genre)}</div>
                <h4>${this.escapeHtml(movie.title)}</h4>
                <p>⭐ ${movie.rating.toFixed(1)}</p>
            </div>
        `).join('');
    }

    renderGenreSection(genre, elementId) {
        const container = document.getElementById(elementId);
        if (!container) return;
        
        const genreMovies = this.movies.filter(movie => movie.genre === genre);
        if (genreMovies.length === 0) {
            container.innerHTML = '<p style="color: #999; padding: 20px;">No movies in this genre yet</p>';
            return;
        }
        
        container.innerHTML = genreMovies.map(movie => this.createMovieCard(movie)).join('');
        
        // Add delete event listeners
        document.querySelectorAll(`#${elementId} .btn-delete`).forEach(btn => {
            btn.addEventListener('click', (e) => {
                const id = e.target.closest('.movie-card').dataset.movieId;
                this.deleteMovie(id);
            });
        });

        // Add favorite event listeners
        document.querySelectorAll(`#${elementId} .btn-favorite`).forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const id = e.target.closest('.movie-card').dataset.movieId;
                this.toggleFavorite(id);
            });
        });
    }
}

// Add slide-in animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Initialize the application
window.addEventListener('DOMContentLoaded', () => {
    new MovieDatabase();
});
