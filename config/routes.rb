Orrore::Application.routes.draw do

  resources :points
  resources :servers
  resources :maps

  root :to => "home#index"
  devise_for :users, :controllers => {:sessions => "sessions"}
end
