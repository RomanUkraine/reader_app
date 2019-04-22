# class RegistrationsController < Devise::RegistrationsController
#   def create
#     user = User.from_omniauth(params)

#     # if current_user
#     #   render json: current_user
#     # elsif current_user.nil?
#     #   render json: { user: 'not authenticated' }
#     # else
#     #   sign_in user, event: :authentication
#     #   render json: user
#     # end




#     if user.persisted?
#       sign_in user, event: :authentication

# binding.pry

#       render json: user
#     else


#       sign_in user, event: :authentication
#       render json: user
#     end
#   end
# end
