namespace JUDI.API.Ladder.Contract
{
	public class OkResponse<T>
	{
		public OkResponse(T data)
		{
			Data = data;
		}

		public T Data { get; set; }
	}
}
