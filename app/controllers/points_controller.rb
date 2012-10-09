class PointsController < ApplicationController
  respond_to :json

  def index
    @json = Point.all.to_gmaps4rails
    respond_with @json
  end

  def create
    @point = Point.new(:latitude => params[:latitude],
                       :longitude => params[:longitude],
                       :marker_id => params[:marker_id])

    if @point.save
      respond_with @point
    end
  end

  def destroy
    puts "OMG"+params.inspect
    @point = Point.find_by_marker_id(params[:id])
    @point.destroy
    respond_with @point
  end
end
