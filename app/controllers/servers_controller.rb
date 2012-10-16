class ServersController < ApplicationController
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
    render :json => { "location" => "/" } #{@server.name.downcase.strip.gsub(' ', '_').gsub(/[^\w-]/, '')}
  end

end
