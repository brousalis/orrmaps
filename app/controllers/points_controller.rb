class PointsController < ApplicationController
  respond_to :json

  def create
    if current_user
      @map = Map.find_by_id(params[:map_id])
      @point = Point.new(:latitude => params[:latitude],
                         :longitude => params[:longitude],
                         :marker_id => params[:marker_id],
                         :icon => params[:icon])
      @point.map = @map
      if @point.save
        respond_with @point
        puts "created #{params[:marker_id]}"
      else
        render :json => { "status" => "failure" }
      end
    else
      render :json => { "status" => "unauthorized" }
    end
  end

  def update
    @point = Point.find_by_marker_id(params[:marker_id])
    puts "finding #{params[:marker_id]}"
    if @point && @point.update_attributes(:marker_id => params[:new_marker_id],
                                          :latitude => params[:latitude],
                                          :longitude => params[:longitude])
      render :json => @point
    else
      render :json => { "status" => "failure" }
    end
  end

  def notes
    @point = Point.find_by_marker_id(params[:marker_id])
    if @point && @point.note && @point.note.update_attributes(:content => params[:content])
      render :json => { "status" => "success" }
    elsif @point && !@point.try(:note)
      @note = Note.create(:point => @point, :content => params[:content])
      @point.update_attributes(:note => @note)
      render :json => { "status" => "success" }
    else
      render :json => { "status" => "failure" }
    end
  end

  def destroy
    @point = Point.find_by_marker_id(params[:marker_id])
    @point.destroy if @point
    render :json => @point
  end
end
