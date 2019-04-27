class UsersController < ApplicationController

  def show
    render json: { data: current_user }
  end

end
