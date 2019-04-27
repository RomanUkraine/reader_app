class ApplicationController < ActionController::API
  acts_as_token_authentication_handler_for User, fallback: :none
  before_action :authenticate_user!

  def current_user
    @current_user ||= User.find_by(id: session["warden.user.user.key"][0])
  end
end
