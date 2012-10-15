class PointsController < ApplicationController
  respond_to :json

  def create
    @point = Point.new(:latitude => params[:latitude],
                       :longitude => params[:longitude],
                       :marker_id => params[:marker_id])

    if @point.save
      respond_with @point
    end
  end

  def update
    @point = Point.find_by_marker_id(params[:marker_id]);
    @point.latitude = params[:latitude]
    @point.longitude = params[:longitude]
    @point.save
  end

  def destroy
    @point = Point.find_by_marker_id(params[:id])
    @point.destroy
    respond_with @point
  end
end
