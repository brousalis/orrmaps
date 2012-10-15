class MapsController < ApplicationController
  respond_to :json

  def index
    if user_signed_in?
      @map = Map.find_or_create_by_created_at(Date.today.to_s)
      @points = @map.points.to_gmaps4rails
    end

    respond_with Point.all.to_gmaps4rails
  end

end
