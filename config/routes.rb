Rails.application.routes.draw do
  devise_for :users, controllers:
                   { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :read_entries
  resources :books
  get '/current_user', to: 'users#show'
end
