class ServersController < ApplicationController
  respond_to :json

  def create
    @server = Server.find_by_name(params[:server])
    session[:server] = @server.name
    if current_user
      @user = current_user
      @user.map.server = @server
      @user.map.save
      @user.server = @server
      @user.save
      current_user = @user
    end
    render :json => { "location" => "/" }
  end

  def show
    name = params[:name].titleize.sub("Of", "of")
    @user = User.new
    @server = Server.find_by_name(name)
         @servers = {:US => Server.select(:name).where(:country => 'US').order(:name),
                :EU => Server.select(:name).where(:country => 'EU').order(:name),
                :FR => Server.select(:name).where(:country => 'FR').order(:name),
                :GE => Server.select(:name).where(:country => 'GE').order(:name),
                :MX => Server.select(:name).where(:country => 'MX').order(:name)} 
    @rated = rated(@server)
  end

  def points
    name = params[:name].titleize.sub("Of", "of") 
    server = Server.find_by_name(name)
    data = server.maps.sort_by { |m| [ m.likes.count ] }.reverse.map do |map|
      {:likes => map.likes.count, :points => map.points.flatten.to_json}
    end
    render :json => data
  end
end
