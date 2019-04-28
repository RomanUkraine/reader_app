class StatisticsController < ApplicationController
  def show
    stats = MonthlyStats.new(current_user.id).generate
    render json: { data: stats }
  end
end
