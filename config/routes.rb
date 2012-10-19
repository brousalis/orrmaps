Orrore::Application.routes.draw do
  resources :users
  resources :points
  resources :servers
  resources :maps

  root :to => "home#index"
  get "logout" => "users#destroy", :as => "logout"
  post "likes" => "maps#like", :as => "likes"
  put "points" => "points#update", :as => "points"
  delete "points" => "points#destroy", :as => "points"
  match "/map/:id" => "maps#map"
  match "/server/:name" => "servers#show"
  post "server_maps" => "servers#points", :as => "servers"
  match "/user/delete" => "users#delete"
  post "up" => "points#up", :as => "up"
  post "down" => "points#down", :as => "down"
end
