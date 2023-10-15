Rails.application.routes.draw do

  root "games#index"

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/games", to: "games#index"
  get "/games/:id", to: "games#show"

  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

end
