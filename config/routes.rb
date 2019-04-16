Rails.application.routes.draw do
  resources :read_entries
  resources :books
  devise_for :users, controllers: { registrations: 'registrations' }
end
