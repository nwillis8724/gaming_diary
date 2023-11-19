Rails.application.routes.draw do

  root "games#index"

  resources :games
  resources :comments


  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  patch '/users/:id', to: 'users#update'
  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/allreviews", to: "games#reviewsbygenre"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  # Create a custom route that takes a parameter of. a word. This word will be a genre, taken from a list of genres populated from the games state. 
  # Take the word and find all the games that have that genre. 
  # Then turn around and find all the reviews for all those games. 
  # Send back a collection of review objects. Plan for the parameter being an empty string in which case you should send back a message reminding the user to send a search parameter. 
  # you should also build error handling for words that return no matching genres.

end
