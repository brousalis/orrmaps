Orrore::Application.routes.draw do
  devise_for :users

  resources :users
  resources :points
  resources :servers
  resources :maps

  root :to => "home#index"
end
