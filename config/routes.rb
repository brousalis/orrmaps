Orrore::Application.routes.draw do
  resources :users
  resources :points
  resources :servers
  resources :maps

  root :to => "home#index"
  get "logout" => "users#destroy", :as => "logout"
end
