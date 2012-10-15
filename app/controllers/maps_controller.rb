class MapsController < ApplicationController
  respond_to :json

  def index
    if user_signed_in?
      @map = Map.find_or_create_by_created_at(Date.today.to_s)
      @map.user = current_user
      @map.save
      @points = @map.points.to_gmaps4rails
    end

    respond_with @points
  end

end
