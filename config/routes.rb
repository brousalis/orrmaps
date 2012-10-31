Orrore::Application.routes.draw do
  resources :users
  resources :points
  resources :servers
  resources :maps

  root :to => "home#index"

  get "rated" => "servers#rated", :as => "rated"
  get "logout" => "users#destroy", :as => "logout"
  post "likes" => "maps#like", :as => "likes"
  post "server_maps" => "servers#points", :as => "servers"
  put "points" => "points#update", :as => "points"
  delete "points" => "points#destroy", :as => "points"
  put "notes" => "points#notes", :as => "notes"

  match "/map/:id" => "maps#map"
  match "/server/:name" => "servers#show"
  match "/user/delete" => "users#delete"
end
