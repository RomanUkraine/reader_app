Rails.application.routes.draw do
  devise_for :users, controllers:
                   { omniauth_callbacks: 'users/omniauth_callbacks' }

  resources :books do
    resources :read_entries
  end

  resources :assigned_books

  get '/current_user', to: 'users#show'
end
