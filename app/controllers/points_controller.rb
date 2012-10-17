class PointsController < ApplicationController
  respond_to :json

  def create
    if current_user
      @map = Map.find_by_id(params[:map_id])
      @point = Point.new(:latitude => params[:latitude],
                         :longitude => params[:longitude],
                         :marker_id => params[:marker_id])
      @point.map = @map
      if @point.save
        respond_with @point
      else
        render :json => { "status" => "failure" }
      end
    else
      render :json => { "status" => "unauthorized" }
    end
  end

  def update
    @point = Point.find_by_marker_id(params[:marker_id]);
    if @point 
      @point.marker_id = params[:new_marker_id]
      @point.latitude = params[:latitude]
      @point.longitude = params[:longitude]
      @point.save
      respond_with @point
    end
  end

  def destroy
    @point = Point.find_by_marker_id(params[:marker_id])
    @point.destroy
    respond_with @point
  end
end
