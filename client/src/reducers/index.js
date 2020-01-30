const uuidv4 = require("uuid/v4");
export const FORM_CHANGE = "FORM_CHANGE";

const initialState = {
  isloading: false,
  movies: [],
  error: {},
  movie: {
    id: uuidv4(),
    title: "",
    director: "",
    metascore: "",
    stars: []
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "DATA_START":
      return {
        ...state,
        isloading: true
      };
    case "DATA_SUCCESS":
      return {
        ...state,
        isloading: false,
        movies: action.payload
      };
    case "DATA_FAILURE":
      return {
        ...state,
        isloading: false,
        movies: action.payload
      };

    case FORM_CHANGE:
      return {
        ...state,
        movie: {
          ...state.movie,
          [action.name]: action.value
        }
      };

    case "STAR_CHANGE":
      return {
        ...state,
        movie: {
          ...state.movie,
          stars: [...state.movie.stars, action.payload]
        }
      };

    case "EDIT_CHANGE":
      return {
        ...state,
        movie: {
          ...state.movie,
          id: action.id,
          title: action.title,
          director: action.director,
          metascore: action.metascore,
          stars: [...action.stars]
        }
      };
    case "RESET_FORM": {
      return {
        ...state,
        movie: {
          id: uuidv4(),
          title: "",
          director: "",
          metascore: "",
          stars: []
        }
      };
    }
    case "DELETE": {
      return {
        ...state,
        movie: {
          ...state.movie,
          stars: state.movie.stars.filter((item, index) => {
            return index !== action.payload;
          })
        }
      };
    }
    default:
      return state;
  }
};
