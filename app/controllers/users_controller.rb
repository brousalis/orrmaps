class UsersController < ApplicationController
  def create
    @user = User.find_by_name(params[:user][:name].downcase)
    if @user
      if @user.authenticate(params[:user][:name], params[:user][:password])
        session[:user_id] = @user.id
        session[:server] = @user.server.name if @user.server
        session[:serevr] = "Jade Quarry" if !@user.server
        render :json => {:location => '/'}
      else
        render :json => {:errors => "Wrong password"}
      end
    else
      @user = User.new(params[:user])
      @server = Server.find_by_name(params[:server])
      @user.server = @server
      if @user.save
        session[:user_id] = @user.id
        session[:server] = @server.name
        render :json => {:location => '/'}
      else
        render :json => {:errors => @user.errors.full_messages.join(', ')}
      end
    end
  end

  def delete
    current_user.map.points.destroy_all
    current_user.map.destroy
    current_user.destroy
    session[:user_id] = nil
    redirect_to root_url
  end

  def destroy
    session[:user_id] = nil
    redirect_to root_url
  end 
end
