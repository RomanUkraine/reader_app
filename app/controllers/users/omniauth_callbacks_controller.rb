class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController

  def github
    user = User.from_omniauth(request.env["omniauth.auth"])

    if user.persisted?
      session[:user_id] = user.id
      sign_in user
      # response.headers['X-User-Token'] = user.authentication_token
    else
      session["devise.github_data"] = request.env["omniauth.auth"]
    end

    redirect_to "http://localhost:3001/?token=#{user.authentication_token}"
    # TODO pass token in a header?
  end
end
