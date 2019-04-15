class RegistrationsController < Devise::RegistrationsController
  def create
    user = User.from_omniauth(params)

    if user.persisted?
      sign_in user, event: :authentication
    else
      render json: { user: "already signed in" }
    end
  end
end
